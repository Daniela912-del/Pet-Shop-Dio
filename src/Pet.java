public class Pet {
    private String name;
    private boolean clean;

    public Pet(String name) {
        this.name = name;
        this.clean = false;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isClean() {
        return clean;
    }

    public void setClean(boolean clean) {
        this.clean = clean;
    }
}
