# YAML: needed to convert result array to yaml file later
require 'yaml'
if !File.exist?('_data/auto_tags.yml')
    File.open("_data/auto_tags.yml", 'w') {}
end
# Specifies the hook. This determines in which step of the build process this script will be run.
Jekyll::Hooks.register :site, :post_read do |site|
    puts "Running plugin generate_tag_list..."
    # Create arrays to first level (areas) and second level (topics) tags
    $first_level = []
    $second_level = []
    # Iterate over all collections (first level is a container holding single collections)
    site.collections.each do |collcontainer|
        # These are actual collections
        collcontainer.each do |collection|
            # If the collection responds to each, in which case it is of a type that can be iterated over
            if collection.respond_to?("each")
                # If the current collection is any of the relevant ones (those that use tags)...
                if collection.label == 'projects' #|| collection.label == 'posts' # Posts ("News") are deactivated right now
                    collection.docs.each do |item|
                        # If research-areas field exists and contains information
                        if item['research-areas']
                            if item['research-areas']['areas']
                                if item['research-areas']['areas'].respond_to?("each")                           
                                    item['research-areas']['areas'].each do |area|
                                        # Use a hash to be able to differentiate tag names and their tag IDs later
                                        if area['name'] != '' and area['tag'] != ''
                                            tag = area['name'].downcase.tr(" ", "_")
                                            tag = tag.gsub(/[äöü]/) do |match|
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
                                            $first_level << {'name' => area['name'], 'tag' => tag}
                                        end
                                    end
                                end
                            end
                            if item['research-areas']['topics']
                                if item['research-areas']['topics'].respond_to?("each")
                                    # Do the same for topics
                                    item['research-areas']['topics'].each do |topic|
                                        if topic['name'] != '' and topic['tag'] != ''
                                            tag = topic['name'].downcase.tr(" ", "_")
                                            tag = tag.gsub(/[äöü]/) do |match|
                                                case match
                                                when "ä"
                                                    'ae'
                                                when "ö"
                                                    'oe'
                                                when "ü"
                                                    'ue'
                                                end
                                            end
                                            $second_level << {'name' => topic['name'], 'tag' => tag}
                                        end
                                    end
                                end
                            end
                        end
                    end
                end
            end
        end
    end
    # Remove duplicates
    $first_level_uniq = $first_level.uniq
    $second_level_uniq = $second_level.uniq
    # Sort arrays by 'name' property (downcase since otherwise, tags that start
    # with a downcase letter are positioned after uppercase letters)
    $first_level_sorted = $first_level_uniq.sort_by { |hsh| hsh['name'].downcase }
    $second_level_sorted = $second_level_uniq.sort_by { |hsh| hsh['name'].downcase }
    # Add to result array in a certain hash structure that matches the needed YAML format
    $alltags = {  'research-areas' => { 'areas' => $first_level_sorted, 'topics' => $second_level_sorted }}
    # Convert the array to YAML and write to file
    if !site.data['auto_tags']
        File.open("_data/auto_tags.yml", 'w') {|f| f.write($alltags.to_yaml) }
    else
        
        if $alltags != site.data['auto_tags']
            puts "Used tags and internal tag list do not match. Updating internal tag list..."
            File.open("_data/auto_tags.yml", 'w') {|f| f.write($alltags.to_yaml) }
        end
    end
end