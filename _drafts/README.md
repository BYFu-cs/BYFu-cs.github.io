---
published: false
sitemap: false
---

# Hidden Blog Drafts

The three earlier long-form blog posts are kept in this `_drafts` folder so their source remains in the repository while Jekyll excludes them from the public site, feed, and sitemap during normal builds.

To re-enable one later, move it back into `_blog` or `_posts`, remove `published: false`, set `collections.blog.output: true` if using `_blog`, and restore a public index/navigation link if you want readers to discover it.
