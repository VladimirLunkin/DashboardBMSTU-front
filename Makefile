PROJECTNAME=$(shell basename "$(PWD)")


help: Makefile
	@echo " Choose a command run in "$(PROJECTNAME)":"
	@sed -n 's/^##//p' $< | column -t -s ':' |  sed -e 's/^/ /'


## build: Build docker image
build:
	@docker build -t front .


## run: Run server in docker on port 80
run:
	@docker run -d --rm -p 80:80 --name front front


## clean: Delete docker image
clean:
	@docker stop front
	@docker rmi front


## rerun: Rerun
rerun:
	@docker stop front
	@make run


## rebuild: Rebuild and restart
rebuild:
	@make clean
	@make build
	@make run
