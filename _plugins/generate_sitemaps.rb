require 'pathname'

Jekyll::Hooks.register :site, :post_write do |site|
   
    $sitemap = []
    $sitemap_img = []
    # Save _site directory to variable to form paths correctly (relative to _site)
    $project_root  = Pathname.new("_site")

    # Define a function that writes a sitemap to a specified filename ("sitemap" for default sitemap, "sitemap-image" for image sitemap)
    def write_sitemap(data, filename)
        # Create a new file, overwrite if it exists since appending could cause items to have duplicates
        File.open(filename + ".xml", 'w') {|f| f.write('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')}
        # Iterate over passed array and append items to the empty file
        # data should be an array of sitemap items (paths)
        if data.is_a?(Array)
            data.each do |entry|
                absolute_path = Pathname.new(entry)
                # If current filepath matches index.html, write it so sitemap as / since that's its permalink
                if entry == '_site/index.html'
                    File.open(filename + ".xml", 'a') {|f| f.write('<url><loc>' + 'https://research-knowledge-discovery.github.io/</loc></url>')}
                else
                    # relative_path_from: Forming path relative to _site directory
                    File.open(filename + ".xml", 'a') {|f| f.write('<url><loc>' + 'https://research-knowledge-discovery.github.io/' + absolute_path.relative_path_from($project_root).to_s + '</loc></url>')}
                end
            end
        end
        # Append the closing tag
        File.open(filename + ".xml", 'a') {|f| f.write('</urlset>')}
    end

    # Iterate through files in _site directory (** matches any directory recursively)
    Dir.glob('_site/**/*') do |filename|
        # If the filename matches any of these conditions, skip it, they should not be included
        next if filename == '.' or filename == '..' or filename == '_site/robots.txt' or filename == '_site/sitemap.xml' or filename == '_site/sitemap-image.xml' or filename == '_site/sitemap-reference.txt' or filename == '_site/sitemap-img-reference.txt'
        
        # Sort filenames into correct sitemap (images oder documents)
        # If the file is located in the assets directory and the filename contains .png, add it to the image sitemap array
        if filename.include? '_site/assets/'
            if filename.include? '.png' 
                $sitemap_img << filename                
            end
        # Otherwise, add it to the sitemap array, after checking if it actually is a file and not a directory
        else
            if File.file?(filename)
               $sitemap << filename
            end
        end
    end
    # Next: Compare the arrays with their respective reference files
    # If they are identical, do nothing. If they are not, update the sitemap files and the reference files

    # If no reference files exist (first time plugin runs or if they have been deleted), create and populate them.
    # If this is the case, newly create sitemap.xml and sitemap-image.xml, too

    # First: process for general sitemap, then: process for image-sitemap
    if !File.exist?('sitemap-reference.txt')
        File.open("sitemap-reference.txt", 'w') {}
        # Populate
        $sitemap.each do |item|
            # Also add newline to line ending so File.readlines can be called later to easily process file into array later
            File.open("sitemap-reference.txt", 'a') {|f| f.write(item + "\n")}
        end
        write_sitemap $sitemap, "sitemap"
    # If the reference file in question already exists, read it into an array and check if it matches
    # the new array populated in the directory iteration
    else
        $sitemap_ref = File.readlines('sitemap-reference.txt')
        $sitemap_ref.each do |item|
            # Newlines are preserved in reading process, so they need to be removed for comparison to works
            item.slice! "\n"
        end
        if $sitemap_ref == $sitemap
            puts 'No changes to directory structure. Will not update sitemap.'
        else
            puts 'Directory structure has been changed. Updating sitemap...'
            write_sitemap $sitemap, "sitemap"
            # Update reference file
            File.open("sitemap-reference.txt", 'w') {}
            $sitemap.each do |item|
                File.open("sitemap-reference.txt", 'a') {|f| f.write(item + "\n")}
            end
        end
    end

    # Same as above
    if !File.exist?('sitemap-img-reference.txt')
        File.open("sitemap-img-reference.txt", 'w') {}
        $sitemap_img.each do |item|
            File.open("sitemap-img-reference.txt", 'a') {|f| f.write(item + "\n")}
        end
        write_sitemap $sitemap_img, "sitemap-image"
    else
        $sitemap_img_ref = File.readlines('sitemap-img-reference.txt')
        $sitemap_img_ref.each do |item|
            item.slice! "\n"
        end
        if $sitemap_img_ref == $sitemap_img
            puts 'No changes to directory structure. Will not update image sitemap.'
        else
            puts 'Directory structure has been changed. Updating image sitemap...'
            write_sitemap $sitemap_img, "sitemap-image"
            File.open("sitemap-img-reference.txt", 'w') {}
            $sitemap_img.each do |item|
                File.open("sitemap-img-reference.txt", 'a') {|f| f.write(item + "\n")}
            end
        end
    end    
end