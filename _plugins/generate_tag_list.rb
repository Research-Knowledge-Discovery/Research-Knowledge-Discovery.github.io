#=begin
# (=begin starts a multiline comment, =end ends it)
# YAML: needed to convert result array to yaml file later
require 'yaml'
if !File.exist?('_data/auto_tags.yml')
    File.open("_data/auto_tags.yml", 'w') {}
end
# Specifies the hook. This determines in which step of the build process this script will be run.
Jekyll::Hooks.register :site, :post_read do |site|
    puts "Running plugin generate_tag_list..."
    # Create arrays to hold area names and tags and topic names and tags
    $first_level = []
    $second_level = []
    $debug = ""
    # Iterate over all collections (first level is a container holding single collections)
    site.collections.each do |collcontainer|
        # This is the actual collection
        collcontainer.each do |collection|
            # If the collection responds to each, in which case it is of a type that can be iterated over
            if collection.respond_to?("each")
                # If the current collection is any of the three relevant ones...
                if collection.label == 'projects' || collection.label == 'publications' || collection.label == 'posts'
                    # ... iterate over all collection items, get research areas and topics by iterating
                    # and save them to arrays
                    collection.docs.each do |item|
                        if item['research-areas']
                            if item['research-areas']['areas']
                                #puts item['research-areas']['areas']
                                if item['research-areas']['areas'].respond_to?("each")
                                    #puts item['research-areas']['areas']                                
                                    item['research-areas']['areas'].each do |area|
                                        puts area
                                        # Use a hash to be able to differntiate tag names and their actual tags later
                                        if area['name'] != '' and area['tag'] != ''
                                            $first_level << {'name' => area['name'], 'tag' => area['tag']}
                                        end
                                    end
                                end
                            end
                            if item['research-areas']['topics']
                                if item['research-areas']['topics'].respond_to?("each")
                                    # Do the same for topics
                                    item['research-areas']['topics'].each do |topic|
                                        if topic['name'] != '' and topic['tag'] != ''
                                            $second_level << {'name' => topic['name'], 'tag' => topic['tag']}
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
    # Remove duplicates from arrays
    $first_level_uniq = $first_level.uniq
    $second_level_uniq = $second_level.uniq
    # Sort arrays by 'name' property
    $first_level_sorted = $first_level_uniq.sort_by { |hsh| hsh['name'] }
    $second_level_sorted = $second_level_uniq.sort_by { |hsh| hsh['name'] }
    # Add them to the result array in a certain hash structure that matches the needed YAML format
    # so it can be converted to YAML seamlessly and be processed by pages using the filtering 
    # funtion later
    $alltags = {  'research-areas' => { 'areas' => $first_level_sorted, 'topics' => $second_level_sorted }}
    # Convert the array to YAML and write to file
    if !site.data['auto_tags']
        File.open("_data/auto_tags.yml", 'w') {|f| f.write($alltags.to_yaml) }
    else
        
        if $alltags != site.data['auto_tags']
            puts "Used tags and internal tag list do not match. Updating..."
            File.open("_data/auto_tags.yml", 'w') {|f| f.write($alltags.to_yaml) }
        end
    end
end
#=end