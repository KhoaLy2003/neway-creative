FROM openjdk:17

ARG JAR_FILE=target/*.jar

ADD ${JAR_FILE} content-digital-calendar.jar

ENTRYPOINT ["java","-jar","content-digital-calendar.jar"]

EXPOSE 80