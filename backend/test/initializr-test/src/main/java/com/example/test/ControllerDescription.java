package com.example.test;

import java.util.ArrayList;
import java.util.List;

public class ControllerDescription {
    private List<String> names = new ArrayList<>();

    public List<String> getNames() {
        return names;
    }

    public void add(String name) {
        names.add(name);
    }
}
