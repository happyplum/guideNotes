# .gitlab-ci.yml

```yml
stages:
  - build
  - docker

image: happyplum/deno:latest

build-job:
  stage: build
  only:
    - main
  artifacts:
    paths:
      - server
  before_script:
    - |
      echo "NPM Registry Server ${NPM_REG_SERVER}"
      rm -rf .npmrc
      echo -e "registry=${NPM_REG_SERVER}" >> .npmrc
  script:
    - deno task build

build-docker:
  stage: docker
  image: docker:latest
  only:
    - main
  when: manual
  artifacts:
    paths:
      - notes.docker.tar
  before_script:
    - unset DOCKER_HOST #fix Error dial tcp: lookup localhost on 8.8.8.8:53: no such host
  script:
    - docker build -t notes:latest .
    - docker save notes:latest > notes.docker.tar
    - ls -l
  needs:
    - build-job
```
