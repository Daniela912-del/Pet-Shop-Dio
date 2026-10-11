public class PetMachine {

    private  boolean clean = true;

    private  int water = 30;

    private  int shampoo = 10;

    private Pet pet = null;

    public void takeAShower(){
        if (this.pet ==  null) {


            System.out.println("Coloque o pet na mannequin para ínicar o banho");
            return;
        }
        pet.setClean(true);
        System.out.println("o pet "+ pet.getName()+ " Esta limpo");

    }

    public void addWater(){
        if (water == 30) {
            System.out.println("A capacidade de água está no maxímo");
            return;
        }
            water += 2;
            System.out.println("Água adicionada com sucesso!");
    }

    public void addShampoo(){
        if (shampoo == 10) {
            System.out.println("A capacidade de shampoo está no maxímo");
            return;
        }
        shampoo += 2;
        System.out.println("Shampoo adicionado com sucesso!");
    }

    public int getWater() {
        return water;
    }

    public int getShampoo() {
        return shampoo;
    }

    public boolean hasPet() {
        return pet != null;
    }
    public  void setPet(Pet pet) {
        if (!this.clean) {
            System.out.println("A máquina está suja. É necessário limpá-la antes de colocar outro pet.");
            return;
        }
        if (hasPet()) {
            System.out.println("O pet "+ this.pet.getName()+ " está na máquina nesse momento");
            return;
        }
            this.pet = pet;
    }
    public  void  removePet() {
        if (!hasPet()) {
            System.out.println("Não há pet na máquina para remover.");
            return;
        }
         this.clean =  this.pet.isClean();

        System.out.println(" O pet "+ this.pet.getName()+ " foi removido da máquina");
         this.pet = null;

        }
        public void  wash(){
        this .water -= 10;
        this.shampoo -= 2;
        this.clean = true;
            System.out.println("A Máquina foi lavada com sucesso!");

    }
}
