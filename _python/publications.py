#!/usr/bin/env python3

import requests
import os
# For handling HTML
from bs4 import BeautifulSoup
import re

# Creating directory holding publications as html files
os.makedirs('../_includes/publications', exist_ok=True)

filename_ir = 'tags_ir.txt'
filename_nlp = 'tags_nlp.txt'

# Reading used tags in each research area
with open(filename_ir) as f_ir:
    tags_ir = f_ir.readlines()
# Removing '\n' at the end of each line
tags_ir = [x.rstrip('\n') for x in tags_ir] 

with open(filename_nlp) as f_nlp:
    tags_nlp = f_nlp.readlines()
tags_nlp = [x.rstrip('\n') for x in tags_nlp] 

# Old base
# base = 'https://www.bibsonomy.org/layout/harvardhtmlyear/user/irgroup_thkoeln'
base_ds = 'https://www.gernotheisenberg.de/publikationen.html'
base_ir = 'https://www.bibsonomy.org/layout/publist-year-en/user/irgroup_thkoeln'
base_nlp = 'https://www.bibsonomy.org/layout/publist-year-en/user/lepsky/myown'

page = requests.get(base_ds)
ds_raw = page.content
ds_fullhtml = BeautifulSoup(ds_raw, 'html.parser')
ds_snippet = ds_fullhtml.findAll('div', class_='entry-content clearfix')
# Extracting a specific author's publications
if ds_snippet is not None:
    html_woehrle = ds_snippet[1].findAll('li', text=re.compile("Wöhrle"))
    with open('../_includes/publications/heisenberg.html', mode='w', encoding='utf-8') as localfile: localfile.write(str(ds_snippet[1]))

if html_woehrle is not None:
    with open('../_includes/publications/woehrle.html', mode='w', encoding='utf-8') as localfile: 
        localfile.write('<ul>')
        for item in html_woehrle:
            localfile.write(str(item))
        localfile.write('</ul>')

# Not currently in use as IR publications are shown on an external website

# Get single publists per tag (IR)
#for tag in tags_ir:
#    url = base_ir + "/" + tag + '?resourcetype=publication&items=500&duplicates=merged'
#    page = requests.get(url)
#    with open('../_includes/publications/'+ tag +'.html', mode='wb') as localfile: localfile.write(page.content)

# Get NLP myown publist and assign to Professor Lepsky
page = requests.get(base_nlp)
with open('../_includes/publications/lepsky.html', mode='wb') as localfile: localfile.write(page.content)

# Not currently in use

# get single publists per tag (nlp)
#for tag in tags_nlp:
#    url = base_nlp + " " + tag + '?resourcetype=publication&items=500&duplicates=merged'
#    page = requests.get(url)
#    with open('../_includes/publications/'+ tag +'.html', mode='wb') as localfile: localfile.write(page.content)