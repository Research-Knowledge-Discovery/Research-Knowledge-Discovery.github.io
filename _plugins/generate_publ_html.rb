puts "Running plugin generate_publ_html..."
# Specifies the hook. This determines in which step of the build process this script will be run.
Jekyll::Hooks.register :people, :pre_render do |person|
    name = person.data['lastname']
    # Replacing umlauts
    newname = name.gsub(/[äöüß]/) do |match|
        case match
        when "ä"
            'ae'
        when "ö"
            'oe'
        when "ü"
            'ue'
        when "ß"
            'ss'
        end
    end
    # Only create new publication file if it does not exist
    if !File.exist?("_includes/publications/" + newname.downcase + ".html")
        puts "New person registered. Creating blank publication file " + newname.downcase + ".html"
        # File's default content before adding publications (is preserved if no publications are assigned to that person)
        File.open("_includes/publications/" + newname.downcase + ".html", 'w') {|f| f.write("<p>No publications available.</p>")}
    end
end

Jekyll::Hooks.register :projects, :pre_render do |project|
    # Get this project's abbreviation
    p_abbr = project.data['abbr']
    p_newabbr = p_abbr.gsub(/[äöüß]/) do |match|
        case match
        when "ä"
            'ae'
        when "ö"
            'oe'
        when "ü"
            'ue'
        when "ß"
            'ss'
        end
    end
    if !File.exist?("_includes/publications/" + p_newabbr.downcase + ".html")
        puts "New project registered. Creating blank publication file " + p_newabbr.downcase + ".html"
        File.open("_includes/publications/" + p_newabbr.downcase + ".html", 'w') {|f| f.write("<p>No publications available.</p>")}
    end
end