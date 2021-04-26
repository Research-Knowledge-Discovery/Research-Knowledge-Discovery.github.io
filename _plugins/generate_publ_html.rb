=begin
# Specifies the hook. This determines in which step of the build process this script will be run.
Jekyll::Hooks.register :people, :pre_render do |person|
    name = person.data['lastname']
    newname = name.gsub(/[äöü]/) do |match|
        case match
        when "ä"
            'ae'
        when "ö"
            'oe'
        when "ü"
            'ue'
        end
    end
    File.open("_includes/publications/" + newname.downcase + ".html", 'w') {|f| f.write("<p>No publications available.</p>")}
end

Jekyll::Hooks.register :projects, :pre_render do |project|
    p_abbr = project.data['abbr']
    p_newabbr = p_abbr.gsub(/[äöü]/) do |match|
        case match
        when "ä"
            'ae'
        when "ö"
            'oe'
        when "ü"
            'ue'
        end
    end
    File.open("_includes/publications/" + p_newabbr + ".html", 'w') {|f| f.write("<p>No publications available.</p>")}
end
=end