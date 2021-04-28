#!/usr/bin/env python3

import requests
import os
from bs4 import BeautifulSoup
import re

os.makedirs('../_includes/publications', exist_ok=True)

#tags_ir = ['schaer','haak','neumann','bonart','breuer','sh2','esupol','prior','stella','joie','engelmann']
#tags_nlp = ['automatisches_indexieren','automatisches_klassifizieren','belletristik','bibliotheken','big_data','bilder','bildung','covid-19','data_science','desinformation','formalerschliessung','hochschulen','information_retrieval','informationsethik','informationskompetenz','informationswissenschaft','inhaltserschliessung','klassifizieren','kognition','kuenstliche_intelligenz','literaturwissenschaft','medienwissenschaft','mehrwortbegriffe','metadaten','myown','netzpolitik','normdaten','ontologien','philosophie','politik','psychologie','publizieren','semantic_web','semantik','sozialwissenschaft','suchmaschinen','szientometrie','terminologieextraktion','text_mining','texttechnologie','thesauri','wirtschaft','wissenschaft','wissenschaftstheorie','wissensorganisation','zz-brf','zz-eaa','zz-i','zz-k','zz-svz']

filename_ir = 'tags_ir.txt'
filename_nlp = 'tags_nlp.txt'

with open(filename_ir) as f_ir:
    tags_ir = f_ir.readlines()
# you may also want to remove whitespace characters like `\n` at the end of each line
tags_ir = [x.rstrip('\n') for x in tags_ir] 

with open(filename_nlp) as f_nlp:
    tags_nlp = f_nlp.readlines()
# you may also want to remove whitespace characters like `\n` at the end of each line
tags_nlp = [x.rstrip('\n') for x in tags_nlp] 

# base = 'https://www.bibsonomy.org/layout/harvardhtmlyear/user/irgroup_thkoeln'
base_ds = 'https://www.gernotheisenberg.de/publikationen.html'
base_ir = 'https://www.bibsonomy.org/layout/publist-year-en/user/irgroup_thkoeln'
base_nlp = 'https://www.bibsonomy.org/layout/publist-year-en/user/lepsky/myown'

page = requests.get(base_ds)
ds_raw = page.content
ds_fullhtml = BeautifulSoup(ds_raw, 'html.parser')
ds_html = ds_fullhtml.findAll('div', class_='entry-content clearfix')
if ds_html is not None:
    html_woehrle = ds_html[1].findAll('li', text=re.compile("Wöhrle"))
    with open('../_includes/publications/heisenberg.html', mode='w', encoding='utf-8') as localfile: localfile.write(str(ds_html[1]))
    #print(ds_html[0])

#for content in ds_html:
    #print(str(content))

  #  html_woehrle = content.findAll('li', text=re.compile("Wöhrle"))



if html_woehrle is not None:
    #print(html_woehrle)
    with open('../_includes/publications/woehrle.html', mode='w', encoding='utf-8') as localfile: 
        for item in html_woehrle:
            localfile.write(str(item))

# get single publists per tag (ir)
#for tag in tags_ir:
#    url = base_ir + "/" + tag + '?resourcetype=publication&items=500&duplicates=merged'
#    page = requests.get(url)
#    with open('../_includes/publications/'+ tag +'.html', mode='wb') as localfile: localfile.write(page.content)

# get nlp myown publist and assign to professor lepsky
#page = requests.get(base_nlp)
#with open('../_includes/publications/lepsky.html', mode='wb') as localfile: localfile.write(page.content)

# get single publists per tag (nlp)
#for tag in tags_nlp:
#    url = base_nlp + " " + tag + '?resourcetype=publication&items=500&duplicates=merged'
#    page = requests.get(url)
#    with open('../_includes/publications/'+ tag +'.html', mode='wb') as localfile: localfile.write(page.content)