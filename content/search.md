---
title: "Search"
layout: layouts/home.njk
---

<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>
<script>
	window.addEventListener('DOMContentLoaded', () => {
		const pagefind = new PagefindUI({ element: "#search", showSubResults: false, sort: { date: "desc" } });
		const params = new URL(document.location.toString()).searchParams;
		if (params.has("q")) {
			pagefind.triggerSearch(params.get("q"));
		}
	});
</script>

<article class="articlebox page type-page status-publish hentry">
	<div class="entry-content">
		<div id="search"></div>
	</div>
</article>
