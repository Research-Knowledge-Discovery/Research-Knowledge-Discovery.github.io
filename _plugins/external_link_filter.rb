module Jekyll
  module ExternalLinkFilter
    def external_link(text, link)
      # rel="noopener noreferrer" used to be added for safety, in modern browsers it is added automatically
      # Without it, opened pages used to have control of the document's window object
      "<a href=\"#{link}\" target=\"_blank\" rel=\"noopener noreferrer\">#{text} <i class=\"fas fa-external-link-alt\"></i></a>"
    end
  end
end

Liquid::Template.register_filter(Jekyll::ExternalLinkFilter)