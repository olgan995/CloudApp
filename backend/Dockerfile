#FROM openjdk:16-jdk-alpine
#VOLUME /tmp
#ARG JAR_FILE
#COPY ${JAR_FILE} app.jar
#ENTRYPOINT ["java", "-jar", "/app.jar"]


FROM openjdk:16-jdk-slim AS builder
WORKDIR /app
COPY gradlew .
COPY gradlew.bat .
COPY gradle ./gradle
COPY build.gradle .
COPY settings.gradle .
COPY src ./src

# Add execution permission for gradlew script
RUN chmod +x gradlew

# Convert line endings to LF
RUN apt-get update && apt-get install -y dos2unix
RUN dos2unix gradlew

RUN ./gradlew --no-daemon wrapper
RUN ./gradlew --no-daemon build

FROM openjdk:16-jdk-slim
WORKDIR /app
COPY --from=builder /app/build/libs/backend-0.0.1-SNAPSHOT.jar .
CMD ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]
