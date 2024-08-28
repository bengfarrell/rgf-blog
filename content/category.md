---
layout: layouts/base.njk
eleventyComputed:
    title: All posts tagged '{{ tag }}'
    permalink: /category/{{ tag }}/
pagination:
    data: collections
    size: 1
    alias: tag
    filter:
        - all
        - nav
        - post
        - posts
        - tagList
---

<header id="archive-header">
<h1 class="page-title" data-pagefind-meta="title">Tag Archive for {{ tag }}</h1>
<ul style="display:none">
	<li><time data-pagefind-meta="date:{{ page.date | htmlDateString }}" datetime="{{ page.date | htmlDateString }}">{{ page.date | readableDate }}</time></li>
</ul>
</header>

{%- for post in collections[tag].reverse() -%}
{%- if not post.data.draft -%}
<article class="articlebox post-1505 page type-page status-publish hentry">
	<header class="entry-header entry-header-single">
		<h1 class="entry-title">
			<a href="{{ post.data.url }}" title="{{ post.data.title }}" rel="bookmark">{{ post.data.title }}</a>
		</h1>
		<h2 class="entry-meta"></h2>
	</header>
	<div class="entry-content">
		{{ post.content | safe }}
	</div><!-- .entry-content -->
</article>
{%- endif -%}
{%- endfor -%}
