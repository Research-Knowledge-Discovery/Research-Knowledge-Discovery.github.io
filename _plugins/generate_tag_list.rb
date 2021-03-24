=begin
require 'yaml'
Jekyll::Hooks.register :site, :pre_render do |site|
    $ds = []
    $dstopics = []
    $nlp = []
    $nlptopics = []
    $ir = []
    $irtopics = []
    site.collections.each do |collcontainer|
        collcontainer.each do |collection|
            if collection.respond_to?("each")
                if collection.label == 'projects' || collection.label == 'publications' || collection.label == 'posts'
                    collection.docs.each do |item|
                        if item['research-areas']
                            if item['research-areas'].respond_to?("each")
                                item['research-areas'].each do |area|
                                    case area['tag']
                                    when 'ds'
                                        $ds << {'name' => area['name'], 'tag' => area['tag']}
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
    $ds = $ds.uniq
    $nlp = $nlp.uniq
    $ir = $ir.uniq
    $dstopicsuniq = $dstopics.uniq
    $nlptopicsuniq = $nlptopics.uniq
    $irtopicsuniq = $irtopics.uniq
    $dstopicsuniq = $dstopicsuniq.sort_by { |hsh| hsh['name'] }
    $nlptopicsuniq = $nlptopicsuniq.sort_by { |hsh| hsh['name'] }
    $irtopicsuniq = $irtopicsuniq.sort_by { |hsh| hsh['name'] }
    $alltags = {  'research-areas' => [{ 'name' => $ds[0]['name'], 'tag' => $ds[0]['tag'], 'topics' => $dstopicsuniq },
        { 'name' => $nlp[0]['name'], 'tag' => $nlp[0]['tag'], 'topics' => $nlptopicsuniq },
        { 'name' => $ir[0]['name'], 'tag' => $ir[0]['tag'], 'topics' => $irtopicsuniq }]}
    File.open("_data/auto_tags.yml", 'w') {|f| f.write($alltags.to_yaml) }
end
=end