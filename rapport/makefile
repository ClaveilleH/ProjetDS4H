# Makefile pour rapport LaTeX avec biblatex
MAIN=rapport
BIBFILE=refs
PDFLATEX=pdflatex -interaction=nonstopmode -synctex=1 -shell-escape
BIBER=bibtex
BIONIC_SCRIPT=bionic.py
BIONIC_SRC=$(MAIN).tex
BIONIC_OUT=$(MAIN)_bionic.tex
BIONIC_PDF=$(MAIN)_bionic.pdf

# Cibles principales
all: $(MAIN).pdf

# ── Compilation finale (pdflatex -> biber -> pdflatex x2) ─────────────────────
$(MAIN).pdf: $(MAIN).tex rapportClass.cls $(MAIN).aux
	$(PDFLATEX) $(MAIN)
	$(BIBER) $(MAIN)
	$(PDFLATEX) $(MAIN)
	$(PDFLATEX) $(MAIN)

# Génération du fichier .aux (première passe)
$(MAIN).aux: $(MAIN).tex rapportClass.cls $(BIBFILE).bib
	$(PDFLATEX) $(MAIN)

# ── Bionic Reading ─────────────────────────────────────────────────────────────
# Génère rapport_bionic.tex puis compile en rapport_bionic.pdf
bionic: $(BIONIC_PDF)

$(BIONIC_OUT): $(BIONIC_SRC) $(BIONIC_SCRIPT)
	python3 $(BIONIC_SCRIPT) $(BIONIC_SRC) $(BIONIC_OUT)

$(BIONIC_PDF): $(BIONIC_OUT) rapportClass.cls $(BIBFILE).bib
	$(PDFLATEX) -jobname=$(MAIN)_bionic $(BIONIC_OUT)
	$(BIBER) $(MAIN)_bionic
	$(PDFLATEX) -jobname=$(MAIN)_bionic $(BIONIC_OUT)
	$(PDFLATEX) -jobname=$(MAIN)_bionic $(BIONIC_OUT)
	@echo "✓ PDF Bionic généré : $(BIONIC_PDF)"

# ── Nettoyage ──────────────────────────────────────────────────────────────────
clean:
	rm -f *.aux *.log *.toc *.lof *.lot *.fls *.fdb_latexmk
	rm -f *.bbl *.bcf *.blg *.run.xml *.synctex.gz
	rm -f *.out *.mtc* *.maux

cleanall: clean
	rm -f $(MAIN).pdf $(MAIN)_bionic.pdf $(BIONIC_OUT)

# ── Affichage ──────────────────────────────────────────────────────────────────
view: $(MAIN).pdf
	# Linux: xdg-open $(MAIN).pdf
	# Mac:   open $(MAIN).pdf
	@echo "PDF généré : $(MAIN).pdf"

view-bionic: $(BIONIC_PDF)
	# Linux: xdg-open $(MAIN)_bionic.pdf
	# Mac:   open $(MAIN)_bionic.pdf
	@echo "PDF Bionic généré : $(MAIN)_bionic.pdf"

.PHONY: all clean cleanall view bionic view-bionic