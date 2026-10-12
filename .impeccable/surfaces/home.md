# Home portfolio

Route: /
Mode: Experience
Scope: Existing portfolio extended with the user's real portrait and a centered scrolling composition.

## Direction contract

First viewport: Elias's name and role on a left paper panel; portfolio description, interests and contact link on a right paper panel; Elias and the Frankfurt skyline visibly between them. The photograph remains a full rectangular photograph, without a cutout or face alteration.

Signature: native CSS position:sticky keeps the photograph at 64px below the navigation. Featured and other project panels flow left and right with a reserved center gap of clamp(340px, 35vw, 560px). Even project panels are offset downward by 128px. The opaque newsletter closes the photograph passage; contact follows on paper.

At 1099px and below, the photograph returns to ordinary document flow above the introduction and projects. At 599px and below the introduction becomes one column. The photograph frame uses clamp(240px, 36svh, 300px) with a centered 1.5× zoom at a 75% vertical origin, keeping the face readable and revealing the introduction earlier. Project grids retain their existing one-column mobile / two-column tablet behavior. Motion reduction suppresses automatic media advancement and CSS transitions, while content stays visible.

## Assets and content

public/elias-frankfurt.webp is a 2400 × 1683, approximately 465KB WebP derived with cwebp quality86 from the original 7851 × 5504 user photograph. Origin is stored in public/elias-frankfurt.webp.json. It contains no generated portrait imagery. The existing project arrays, links and media were checked against saved baseline ca046fc and are unchanged.

## Local validation

TypeScript passes. The single Impeccable detector run returned no findings. Parent browser verification reported no horizontal overflow at viewport widths 338, 400, 983, 1121 and 1583px; the photo was relative at 983px and sticky at 64px on desktop. Parent tested keyboard carousel advancement, project filtering and restoration, newsletter topic selection and contact anchor placement. Actual newsletter submission and external destinations were not exercised.

Captures supplied by the parent: portrait-desktop.jpg, portrait-scroll.jpg and portrait-mobile.jpg in the chat outputs directory. Independent finish review found no visual blockers. Its documentation fix (missing product/design context) was addressed with PRODUCT.md, DESIGN.md and the design sidecar. Review was limited to the supplied captures, source and parent browser evidence.
