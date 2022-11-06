package com.web.trackingtest;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Data
@NoArgsConstructor
public class Word {
    String str;
    String str2;

    public String getStr() {
        return str;
    }
}
