# Search Engine Architecture

Search engines transform unstructured or semi-structured data into queryable indexes that enable fast and relevant information retrieval. Modern search architecture spans crawling, indexing, query processing, and ranking components.

Crawling components discover and fetch content from various sources - web crawlers for internet content, connectors for databases and APIs, and file system scanners for documents. Crawling strategies balance freshness, completeness, and resource utilization through prioritization algorithms and politeness policies (respecting robots.txt and rate limits).

Indexing transforms raw content into optimized data structures for retrieval. This process includes text extraction, tokenization, normalization, stop word removal, and stemming/lemmatization. Inverted indexes map terms to document IDs with position information, while forward indexes support document retrieval and feature extraction. Additional specialized indexes like geospatial or numeric range indexes support complex queries.

Query processing converts user queries into executable search plans. This includes parsing, understanding query intent, expanding terms (synonyms, spelling corrections), and rewriting queries for optimization. Complex queries may be broken into sub-queries executed in parallel.

Ranking determines result order based on relevance, popularity, recency, and personalization factors. TF-IDF and BM25 provide baseline text relevance, while machine learning models incorporate hundreds of signals including user behavior data. Learning-to-rank approaches train models using click data and explicit feedback.

Search architecture typically employs a distributed approach with sharded indexes for horizontal scaling. Each shard contains a subset of documents, while replication provides redundancy and query parallelism. Query fanout distributes requests across shards with results merged before ranking.

Performance optimization techniques include caching at multiple levels (query results, document data, and term dictionaries), precomputing common queries, tiered indexes (memory for hot terms, disk for rare terms), and approximate algorithms for features like typeahead and fuzzy matching.