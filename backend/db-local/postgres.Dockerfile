# DockerFile for creating PostgreSQL database
FROM postgres 
ENV POSTGRES_PASSWORD sample-project
ENV POSTGRES_DB sample-project
ENV POSTGRES_USER sample-project