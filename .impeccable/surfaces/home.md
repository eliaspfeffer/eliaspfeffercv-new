# Home portfolio

Route: /
Mode: Experience
Scope: Existing portfolio extended with the user's real portrait and a centered scrolling composition.

## Direction contract

First viewport: Elias's name and role on a left glass panel; portfolio description, interests and contact link on a right glass panel; Elias and the Frankfurt skyline visibly between them. The photograph remains a full rectangular photograph, without a cutout or face alteration.

Signature: native CSS position:sticky keeps the photograph at 64px below the navigation. Featured and other translucent glass project panels flow left and right with a reserved center gap of clamp(340px, 35vw, 560px). Even project panels are offset downward by 128px. The opaque newsletter closes the photograph passage; contact follows on paper.

At 1099px and below, the photograph returns to ordinary document flow above the introduction and projects. At 599px and below the introduction becomes one column. The photograph frame uses clamp(240px, 36svh, 300px) with a centered 1.5× zoom at a 75% vertical origin, keeping the face readable and revealing the introduction earlier. Project grids retain their existing one-column mobile / two-column tablet behavior. Motion reduction suppresses automatic media advancement and CSS transitions, while content stays visible.

## Assets and content

public/elias-frankfurt.webp is a 2400 × 1683, approximately 465KB WebP derived with cwebp quality86 from the original 7851 × 5504 user photograph. Origin is stored in public/elias-frankfurt.webp.json. It contains no generated portrait imagery. The existing project arrays, links and media were checked against saved baseline ca046fc and are unchanged.

## Local validation

TypeScript passes. The single Impeccable detector run returned no findings. Parent browser verification reported no horizontal overflow at viewport widths 338, 400, 983, 1121 and 1583px; the photo was relative at 983px and sticky at 64px on desktop. Parent tested keyboard carousel advancement, project filtering and restoration, newsletter topic selection and contact anchor placement. Actual newsletter submission and external destinations were not exercised.

Captures supplied by the parent: portrait-desktop.jpg, portrait-scroll.jpg and portrait-mobile.jpg in the chat outputs directory. Independent finish review found no visual blockers. Its documentation fix (missing product/design context) was addressed with PRODUCT.md, DESIGN.md and the design sidecar. Review was limited to the supplied captures, source and parent browser evidence.

Liquid Glass refinement: native backdrop blur and saturation, translucent fill and edge highlights replace opaque side-panel material. Dark Reader QA: body contrast >=4.95:1 under worst-case white backdrop, filters click/Space, last item and mobile 338/400px layouts pass. The prior opaque portrait version remains on design/centered-portrait.

Glass material applies only at widths >=1100px, matching the sticky portrait layout. At <=1099px all panels, spacing and controls inherit the previous opaque portrait branch without glass frames.

Refinement branch design/liquid-glass-refined follows the user-pinned glass panel idea, drawing material guidance from the linked SwiftUI skill. 76% fill, 12px blur, 165% saturation and 28px corners reveal more skyline. Screen-blended edge overlay has pointer-events:none. Browser Dark Reader body contrast bound 4.81:1; mobile glass disabled; keyboard filtering passes. Backup checkpoint 79314d3 and backup/liquid-glass-before-refinement remain available.

Portfolio curation (12 October): Mesh Research moved before PixelHUD, Songs and Athlet added, source screenshots captured without reload, Blackstock removed. Native Others disclosure starts closed and contains AI-CTO, NATO, Nostr Relay Speed, My Container Space, AI Orchestrator, Longevity Protocol, FoundersMap, TikTok, climate concept and LifePathPlaner. HTTP402/410 targets keep media but show unavailable status and no external action. Verified disclosure mouse/Enter, final archive entry, filtering, unavailable links and small-screen overflow in normal Chrome.
