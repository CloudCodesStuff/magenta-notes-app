# Establish connection with db.
DB = ./db.sh

# SQL query file.
QUERY = query.sql

# SQL query options.
# -t Tabular: Print out results in tabular format.
# -v Verbose: Print out query before execution.
QUERY_OPTIONS = -t -v

.PHONY: $(QUERY)
$(QUERY):
	@sh $(DB) $(QUERY_OPTIONS) < $@
