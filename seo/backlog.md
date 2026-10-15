# SEO-Backlog

## Erledigt am 15.10.2026

Sitemap auf echte Seiten reduziert; Canonical und serverseitiges Schema korrigiert. Öffentliche Projektlinks und Schema abgeglichen, Calendar365 ergänzt und X-Profil korrigiert. Pauschale Trading-Outperformance-Aussagen durch historische Backtest- und Vergleichsbeschreibungen mit ausdrücklicher Ergebnisgrenze ersetzt. Keine privaten Trading- oder Admin-Details ergänzt.

## Veröffentlichung

`vercel inspect https://www.eliaspfeffer.de --scope elias-e1b1` zeigt das READY-Produktionsdeployment von `eliaspfeffercv-new` mit beiden Domain-Aliases, Stand 15.10.2026. Der bestehende SEO-Preview desselben Projekts ist ebenfalls READY. Der zusätzliche GitHub-Status `Vercel – eliaspfeffercv` verweist auf eine Kontosperre; dieses zusätzliche Projekt ist im aktiven Scope nicht vorhanden beziehungsweise nicht zugänglich. Das belegt keinen Fehler des tatsächlich live bedienenden Projekts. Keine Vercel-Konfiguration oder Infrastruktur geändert.

## Nächste Prüfung

Nach Veröffentlichung Canonical und Sitemap live kontrollieren und die geänderten Projektkarten im bestehenden Chrome prüfen. Google-Indexierung und Rankingwirkung bleiben ohne verifizierte Search-Console-Daten offen.

`npm run lint` startet mangels bestehender ESLint-Konfiguration einen Einrichtungsdialog und liefert keinen abgeschlossenen Lintlauf. Next-Build, expliziter TypeScript-Check und Assertions gegen das erzeugte öffentliche HTML sind ausgeführt.

## Bestehende öffentliche Dateihistorie

15.10.2026: Eine interne Analyseabbildung wird im Sicherheits-Folge-PR aus dem öffentlichen Assetbestand entfernt und durch die freigegebene Homepageaufnahme ersetzt. Das Repository ist öffentlich. Der ursprüngliche Commit 095a3f083c91daf680af87624ec186fb7f7ac2a4 vom 20.04.2026 ist bereits öffentlich; ausschließlich HTTP-HEAD-Prüfungen lieferten für Raw-HEAD und den historischen Raw-Pfad jeweils Status 200. Ein Löschcommit entfernt keine alten Git-Blobs oder bestehenden Deploymentkopien. Ein Umschreiben der Historie wurde nicht vorgenommen und benötigt eine gesonderte Entscheidung. Die zusätzliche unreferenzierte alte Homepageaufnahme wurde visuell geprüft; keine Dashboard-/Strategieansicht erkennbar.
