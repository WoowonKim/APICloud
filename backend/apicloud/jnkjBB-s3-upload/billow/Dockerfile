#FROM openjdk:11-jdk
#VOLUME /tmp
#COPY build/libs/billow-0.0.1-SNAPSHOT.jar billow.jar
#ENTRYPOINT ["java","-jar","billow.jar"]

FROM openjdk:11 AS builder
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul
RUN chmod =x ./gradlew
RUN ./gradlew bootJar
#RUN ./gradlew clean build --exclude-task test

FROM openjdk:11
COPY --from=builder build/libs/billow-0.0.1-SNAPSHOT.jar billow.jar

EXPOSE 8009
CMD ["java","-jar","/billow.jar"]