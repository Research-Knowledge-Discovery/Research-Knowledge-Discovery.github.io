source "https://rubygems.org"
# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!

# Theme
gem "bulma-clean-theme", "~> 0.11.2"

# Some gems are automatically installed and activated as a dependency
# of Bulma Clean Theme (listed here: https://rubygems.org/gems/bulma-clean-theme).
# and GitHub-Pages-Gem (listed here: https://rubygems.org/gems/github-pages/)

# Plugin "jekyll-redirect-from" is still listed for use with deactivated github-pages-gem
gem "jekyll-redirect-from", "0.16.0"

# If you want to use the GitHub Pages gem, uncomment 
# the line gem "github-pages", "~> 217". 
# To upgrade, run `bundle update github-pages`.

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-remote-theme", "0.4.3"
  #gem "github-pages", "~> 217"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
gem "webrick", "~> 1.7"
