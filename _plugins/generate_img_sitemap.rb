require 'pathname'

Jekyll::Hooks.register :site, :post_write do |site|
    puts "Running plugin generate_img_sitemap..."
    $image_sitemap = []
    # Save _site directory to variable to form paths correctly (relative to _site)
    $project_root  = Pathname.new("_site")

    # Define a function that writes a sitemap to a specified filename
    def write_sitemap(data, filename)
        puts "generate_img_sitemap.rb: Writing image-sitemap..."
        # Create a new file, overwrite if it exists since appending could cause items to have duplicates
        # Specifying schema, adding newlines when applicable
        File.open(filename + ".xml", 'w') {|f| f.write('<?xml version="1.0" encoding="UTF-8"?>' + "\n" + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' + "\n")}
        # Iterate over passed array and append items to the empty file
        # data should be an array of sitemap items (paths)
        if data.is_a?(Array)
            data.each do |entry|
                absolute_path = Pathname.new(entry)
                # relative_path_from: Forming path relative to _site directory
                File.open(filename + ".xml", 'a') {|f| f.write('<url>' + "\n" + '<loc>' + 'https://research-knowledge-discovery.github.io/' + absolute_path.relative_path_from($project_root).to_s + '</loc>' + "\n" + '</url>'+ "\n")}
            end
        end
        # Append the closing tag
        File.open(filename + ".xml", 'a') {|f| f.write('</urlset>')}
    end

    # Iterate through files in _site directory (** matches any directory recursively)
    Dir.glob('_site/**/*') do |filename|
        # If the file is located in the assets directory and the filename contains .png, add it to the image sitemap array
        if filename.include? '_site/assets/'
            if filename.include? '.png' or filename.include? '.jpg'
                $image_sitemap << filename                
            end
        end
    end
    # Compare file evaluation with the site's image-sitemap
    # If they are identical, do nothing. If they are not, update the image-sitemap
    $image_sitemap_ref = File.read('image-sitemap.xml')
    content = $image_sitemap_ref.gsub('<?xml version="1.0" encoding="UTF-8"?>' + "\n" + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">', "")
    content = content.gsub('<url>' + "\n" + '<loc>', "")
    content = content.gsub('</loc>' + "\n" + '</url>', "")
    content = content.gsub('</urlset>', "")
    content = content.gsub('https://research-knowledge-discovery.github.io', "_site")
    url_list = content.split("\n")
    url_list.shift()
    if url_list == $image_sitemap
        puts 'generate_img_sitemap.rb: Image-sitemap is up to date. (Image-sitemap and file structure match)'
    else
        puts 'generate_img_sitemap.rb: Image-sitemap is not up to date. (Image-sitemap and file structure do not match) Updating image sitemap...'
        write_sitemap $image_sitemap, "image-sitemap"
    end
end