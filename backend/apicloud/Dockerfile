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

FROM openjdk:11
COPY --from=builder build/libs/apicloud-0.0.1-SNAPSHOT.jar apicloud.jar

EXPOSE 8005
CMD ["java","-jar","/apicloud.jar"]