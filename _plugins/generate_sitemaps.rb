require 'pathname'

Jekyll::Hooks.register :site, :post_write do |site|
   
    $sitemap = []
    $sitemap_img = []
    $project_root  = Pathname.new("_site")

    # Define a function that writes a sitemap to a specified filename ("sitemap" for default sitemap, "sitemap-image" for image sitemap)
    def write_sitemap(data, filename)
        # Create a new file, overwrite if it exists since appending does not guarantee a correct sitemap, items could be present twice
        File.open(filename + ".xml", 'w') {|f| f.write('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')}
        # Iterate over passed array and append items to the empty file
        if data.is_a?(Array)
            data.each do |entry|
                #absolute_path = Pathname.new(entry['path'])
                absolute_path = Pathname.new(entry)
                #last_modified = entry['lastmod'].to_s
                last_modified = File.mtime(entry).to_s
                lastmod_formatted = DateTime.parse(last_modified).iso8601()
                if entry == '_site/index.html'
                    File.open(filename + ".xml", 'a') {|f| f.write('<url><loc>' + 'https://research-knowledge-discovery.github.io/</loc><lastmod>' + lastmod_formatted + '</lastmod></url>')}
                else
                    File.open(filename + ".xml", 'a') {|f| f.write('<url><loc>' + 'https://research-knowledge-discovery.github.io/' + absolute_path.relative_path_from($project_root).to_s + '</loc><lastmod>' + lastmod_formatted + '</lastmod></url>')}
                end
            end
        end
        # Append the closing tag
        File.open(filename + ".xml", 'a') {|f| f.write('</urlset>')}
    end

    # Iterate through files in _site directory (** matches any directory recursively)
    Dir.glob('_site/**/*') do |filename|
        # If the filename matches any of these conditions, skip it
        next if filename == '.' or filename == '..' or filename == '_site/robots.txt' or filename == '_site/sitemap.xml' or filename == '_site/sitemap-image.xml' or filename == '_site/sitemap-reference.txt' or filename == '_site/sitemap-img-reference.txt'
        # If the file is located in the assets directory and the filename contains .png, add it to the image sitemap array
        if filename.include? '_site/assets/'
            if filename.include? '.png' 
                #$sitemap_img << {'path' => filename, 'lastmod' => File.mtime(filename).to_s}
                $sitemap_img << filename                
            end
        # Otherwise, add it to the sitemap array, after checking if it actually is a file and not a directory
        else
            if File.file?(filename)
                #$sitemap << {'path' => filename, 'lastmod' => File.mtime(filename).to_s}
                $sitemap << filename
            end
        end
    end
    # Compare the arrays with their respective reference files
    # If they are identical, do nothing. If they are not, update the sitemap files and the reference files

    # If no reference files exists (first time plugin runs or if they have been deleted), create and populate them.
    # Afterwards, create sitemap.xml and sitemap-image.xml if reference files have not been existent (first time plugin runs)
    # or overwrite them if sitemap array and reference file array don't match.
    if !File.exist?('sitemap-reference.txt')
        File.open("sitemap-reference.txt", 'w') {}
        # Populate
        $sitemap.each do |item|
            # Also add newline to line ending so File.readlines can be called later to easily process file into array later
            #File.open("sitemap-reference.txt", 'a') {|f| f.write(item['path'] + "\n" + item['lastmod'] + "\n")}
            File.open("sitemap-reference.txt", 'a') {|f| f.write(item + "\n")}
        end
        # Write sitemap if reference has not been existent
        write_sitemap $sitemap, "sitemap"
    # If the reference file in question already exists, read it into an array and check if it matches
    # the new array populated in the directory iteration
    else
        $sitemap_ref = File.readlines('sitemap-reference.txt')
        $sitemap_ref.each do |item|
            # Remove previously added newlines so comparison works
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

    if !File.exist?('sitemap-img-reference.txt')
        File.open("sitemap-img-reference.txt", 'w') {}
        $sitemap_img.each do |item|
            #File.open("sitemap-img-reference.txt", 'a') {|f| f.write(item['path'] + "\n" + item['lastmod'] + "\n")}
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