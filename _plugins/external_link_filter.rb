module Jekyll
  module ExternalLinkFilter
    def external_link(text, link)
      "<a href=\"#{link}\" target=\"_blank\" rel=\"noopener noreferrer\">#{text} <i class=\"fas fa-external-link-alt\"></i></a>"
    end
  end
end

Liquid::Template.register_filter(Jekyll::ExternalLinkFilter)