#=begin
# (=begin starts a multiline comment, =end ends it)
# YAML: needed to convert result array to yaml file later
require 'yaml'
# Specifies the hook. This determines in which step of the build process this script will be run.
Jekyll::Hooks.register :site, :pre_render do |site|
    # Create arrays to hold area names and tags and topic names and tags
    $ds = []
    $dstopics = []
    $nlp = []
    $nlptopics = []
    $ir = []
    $irtopics = []
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
                            if item['research-areas'].respond_to?("each")
                                item['research-areas'].each do |area|
                                    # Save tags by area
                                    case area['tag']
                                    when 'ds'
                                        # Use a hash to be able to differntiate tag names and their actual tags later
                                        $ds << {'name' => area['name'], 'tag' => area['tag']}
                                        # Do the same for topics
                                        area['topics'].each do |topic|
                                            $dstopics << {'name' => topic['name'], 'tag' => topic['tag']}
                                        end
                                    when 'nlp'
                                        $nlp << {'name' => area['name'], 'tag' => area['tag']}
                                        area['topics'].each do |topic|
                                            $nlptopics << {'name' => topic['name'], 'tag' => topic['tag']}
                                        end
                                    when 'ir'
                                        $ir << {'name' => area['name'], 'tag' => area['tag']}
                                        area['topics'].each do |topic|
                                            $irtopics << {'name' => topic['name'], 'tag' => topic['tag']}
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
    $ds = $ds.uniq
    $nlp = $nlp.uniq
    $ir = $ir.uniq
    $dstopicsuniq = $dstopics.uniq
    $nlptopicsuniq = $nlptopics.uniq
    $irtopicsuniq = $irtopics.uniq
    # Sort arrays by 'name' property
    $dstopicsuniq = $dstopicsuniq.sort_by { |hsh| hsh['name'] }
    $nlptopicsuniq = $nlptopicsuniq.sort_by { |hsh| hsh['name'] }
    $irtopicsuniq = $irtopicsuniq.sort_by { |hsh| hsh['name'] }
    # Add them to the result array in a more elaborate hash structure that matches a certain format
    # so it can be converted to YAML seamlessly and be processed by pages using the filtering 
    # funtion later
    $alltags = {  'research-areas' => [{ 'name' => $ds[0]['name'], 'tag' => $ds[0]['tag'], 'topics' => $dstopicsuniq },
        { 'name' => $nlp[0]['name'], 'tag' => $nlp[0]['tag'], 'topics' => $nlptopicsuniq },
        { 'name' => $ir[0]['name'], 'tag' => $ir[0]['tag'], 'topics' => $irtopicsuniq }]}
    # Convert the array to YAML and write to file
    File.open("_data/auto_tags.yml", 'w') {|f| f.write($alltags.to_yaml) }
end
#=end