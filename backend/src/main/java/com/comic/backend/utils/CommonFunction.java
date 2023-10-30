package com.comic.backend.utils;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.comic.backend.exception.ValidateException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.networknt.schema.JsonSchema;
import com.networknt.schema.JsonSchemaFactory;
import com.networknt.schema.ValidationMessage;
import com.networknt.schema.SpecVersion.VersionFlag;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class CommonFunction {

    public static <T> T stringJsonToObject(Class<T> clazz, String strReq) throws JsonMappingException, JsonProcessingException {
        return new ObjectMapper().readValue(strReq, clazz);
    }

    public static void jsonValidate(Class<?> clazz, String strReq, String jsonSchema)
            throws JsonMappingException, JsonProcessingException {
        InputStream inputStream = clazz.getClassLoader().getResourceAsStream(jsonSchema);
        validate(inputStream, strReq);
    }

    // handle exception json
    public static void validate(InputStream inputStream, String json)
            throws JsonMappingException, JsonProcessingException {
        JsonSchema schema = JsonSchemaFactory.getInstance(VersionFlag.V7).getSchema(inputStream);
        ObjectMapper om = new ObjectMapper();
        JsonNode jsonNode = om.readTree(json);
        Set<ValidationMessage> errors = schema.validate(jsonNode);
        Map<String, String> stringSetMap = new HashMap<>();
        for (ValidationMessage error : errors) {
            String message = error.getMessage();
            String keyMap = message.substring(2, message.indexOf(":"));
            String value = message.substring(message.indexOf(" ") + 1);
            String valueMap = stringSetMap.getOrDefault(stringSetMap.get(keyMap), "") + ", " + value;
            if (valueMap.startsWith(", "))
                valueMap.substring(2);
            stringSetMap.put(keyMap, valueMap);
        }

        if (!errors.isEmpty()) {
            throw new ValidateException(stringSetMap);
        }
    }

}
