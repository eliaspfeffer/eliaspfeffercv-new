# Openclaw portfolio

Build the production static export with newsletter flags absent/false. Serve only
`out` through Caddy at `/opt/portfolio-web/current`; no Node service or production
credentials are required. Keep the current release and one healthy rollback.

Newsletter signup is explicitly unavailable in this migration. The source API's
public preference-update ownership contract needs resolution, and its provider
configuration has not been restored. Do not expose that API or enable either
newsletter flag without a separate verified backend change. The public site must
show unavailability rather than collecting addresses or claiming success.

Verify the project links, image loading, last archive entry, keyboard collapse,
filtering and small-screen overflow in the actual browser after each release.
Automatic main deployment is not configured yet.
