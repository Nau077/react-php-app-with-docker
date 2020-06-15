ROOT:=$(shell pwd)

.PHONY: build/client
build/client: SHELL=bash
build/client:
	@cd client; \
	exec npm install

.PHONY: run/client
run/client: SHELL=bash
run/client:
	@cd client; \
	exec npm run start


.PHONY: run/server
run/server: SHELL=bash
run/server:
	@cd server; \
	exec docker-compose up -d

.PHONY: run/fix
run/fix: SHELL=bash
run/fix:
	@cd client; \
	exec npm run lint:fix
