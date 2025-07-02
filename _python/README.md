# Publikationsverwaltung

Dieses Verzeichnis enthält Skripte zur automatischen Aktualisierung der Publikationslisten auf der Website.

## Übersicht

Das Skript `publications.py` lädt Publikationsdaten von verschiedenen Quellen herunter und generiert daraus HTML-Dateien, die in der Jekyll-Website verwendet werden.

## Unterstützte Quellen

- **BibSonomy**: Wird für die meisten Publikationslisten verwendet
- **Gernot Heisenbergs Website**: Wird für bestimmte Publikationen verwendet

## Verwendung

### Voraussetzungen

- Python 3.6 oder höher
- Erforderliche Python-Pakete (installierbar über `pip`):
  - requests
  - beautifulsoup4

### Installation

1. Erstellen Sie eine virtuelle Umgebung (empfohlen):
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   # ODER
   source .venv/bin/activate  # Linux/Mac
   ```

2. Installieren Sie die erforderlichen Pakete:
   ```bash
   pip install -r requirements.txt
   ```

### Ausführung

1. Navigieren Sie zum Verzeichnis `_python`:
   ```bash
   cd _python
   ```

2. Führen Sie das Skript aus:
   ```bash
   python publications.py
   ```

3. Die generierten HTML-Dateien werden im Verzeichnis `_includes/publications/` gespeichert.

## Automatisierung (GitHub Actions)

Das Skript kann über GitHub Actions automatisiert werden. Hier ist ein Beispiel für eine Workflow-Datei (`.github/workflows/update_publications.yml`):

```yaml
name: Update Publications

on:
  schedule:
    - cron: '0 0 1 * *'  # Läuft am 1. jedes Monats um Mitternacht
  workflow_dispatch:  # Ermöglicht manuelles Auslösen

jobs:
  update:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.9'
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r _python/requirements.txt
    
    - name: Run publication update
      run: |
        cd _python
        python publications.py
    
    - name: Commit and push changes
      run: |
        git config --global user.name 'GitHub Action'
        git config --global user.email 'action@github.com'
        git add _includes/publications/
        git diff --quiet && git diff --staged --quiet || (git commit -m "Update publications [skip ci]" && git push)
```

## Wartung

### Hinzufügen neuer Autoren/Projekte

1. Öffnen Sie die Datei `publications.py`
2. Fügen Sie den neuen Autor oder das Projekt zur entsprechenden Quelle hinzu
3. Stellen Sie sicher, dass die Ausgabedatei im korrekten Format gespeichert wird

### Fehlerbehebung

- **Fehlende Abhängigkeiten**: Stellen Sie sicher, dass alle erforderlichen Python-Pakete installiert sind
- **Netzwerkprobleme**: Das Skript benötigt eine Internetverbindung, um auf die Publikationsdaten zuzugreifen
- **Berechtigungen**: Stellen Sie sicher, dass das Skript Schreibberechtigungen für das Ausgabeverzeichnis hat

## Lizenz

Dieser Code unterliegt der MIT-Lizenz. Weitere Informationen finden Sie in der `LICENSE`-Datei des Hauptverzeichnisses.
