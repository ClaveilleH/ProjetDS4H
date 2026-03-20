# Makefile pour rapport LaTeX avec biblatex
MAIN=rapport
BIBFILE=refs
PDFLATEX=pdflatex -interaction=nonstopmode -synctex=1
BIBER=bibtex

# Cibles principales
all: $(MAIN).pdf

# Compilation finale (pdflatex -> biber -> pdflatex x2)
$(MAIN).pdf: $(MAIN).tex rapportClass.cls $(MAIN).aux
	$(PDFLATEX) $(MAIN)
	$(BIBER) $(MAIN)
	$(PDFLATEX) $(MAIN)
	$(PDFLATEX) $(MAIN)

# Génération du fichier .aux (première passe)
$(MAIN).aux: $(MAIN).tex rapportClass.cls $(BIBFILE).bib
	$(PDFLATEX) $(MAIN)

# Nettoyage des fichiers auxiliaires
clean:
	rm -f *.aux *.log *.toc *.lof *.lot *.fls *.fdb_latexmk
	rm -f *.bbl *.bcf *.blg *.run.xml *.synctex.gz
	rm -f *.out *.mtc* *.maux

# Nettoyage complet (fichiers auxiliaires + PDF)
cleanall: clean
	rm -f $(MAIN).pdf

# Affichage du PDF (Linux/Mac)
view: $(MAIN).pdf
	# Linux: xdg-open $(MAIN).pdf
	# Mac: open $(MAIN).pdf
	@echo "PDF généré: $(MAIN).pdf"

# Cible par défaut
.PHONY: all clean cleanall view
