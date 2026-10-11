import java.util.Scanner;

public class Main {
    private static final Scanner scanner = new Scanner(System.in);
    private static final PetMachine petMachine = new PetMachine();

    public static void main(String[] args) {
        int option;

        do {
            showMenu();
            option = readOption();

            switch (option) {
                case 1:
                    confirmChoice("Abastecer água");
                    petMachine.addWater();
                    showSupplies();
                    break;
                case 2:
                    confirmChoice("Abastecer shampoo");
                    petMachine.addShampoo();
                    showSupplies();
                    break;
                case 3:
                    confirmChoice("Ver status");
                    showStatus();
                    break;
                case 4:
                    confirmChoice("Verificar se há pet na máquina");
                    System.out.println(petMachine.hasPet()
                            ? "Há um pet na máquina."
                            : "Não há pet na máquina.");
                    break;
                case 5:
                    confirmChoice("Colocar pet na máquina");
                    putPetInMachine();
                    break;
                case 6:
                    confirmChoice("Remover pet da máquina");
                    removePetFromMachine();
                    break;
                case 7:
                    confirmChoice("Limpar a máquina");
                    washMachine();
                    break;
                case 8:
                    confirmChoice("Dar banho no pet");
                    if (petMachine.hasPet()) {
                        petMachine.takeAShower();
                    } else {
                        System.out.println("Coloque um pet na máquina antes do banho.");
                    }
                    break;
                case 0:
                    confirmChoice("Sair");
                    System.out.println("Até logo!");
                    break;
                default:
                    System.out.println("Você escolheu uma opção inválida: " + option);
                    System.out.println("Opção inválida. Escolha uma opção do menu.");
            }
        } while (option != 0);

        scanner.close();
    }

    private static void showMenu() {
        System.out.println("\n--- Máquina de Banho para Pets ---");
        System.out.println("1 - Abastecer água");
        System.out.println("2 - Abastecer shampoo");
        System.out.println("3 - Ver status");
        System.out.println("4 - Verificar se há pet na máquina");
        System.out.println("5 - Colocar pet na máquina");
        System.out.println("6 - Remover pet da máquina");
        System.out.println("7 - Limpar a máquina");
        System.out.println("8 - Dar banho no pet");
        System.out.println("0 - Sair");
        System.out.print("Escolha uma opção: ");
    }

    private static int readOption() {
        String input = scanner.nextLine();

        try {
            return Integer.parseInt(input);
        } catch (NumberFormatException e) {
            return -1;
        }
    }

    private static void showStatus() {
        showSupplies();
        System.out.println("Pet na máquina: " + (petMachine.hasPet() ? "sim" : "não"));
    }

    private static void showSupplies() {
        System.out.println("Água disponível: " + petMachine.getWater());
        System.out.println("Shampoo disponível: " + petMachine.getShampoo());
    }

    private static void confirmChoice(String choice) {
        System.out.println("\nVocê escolheu: " + choice + ".");
    }

    private static void putPetInMachine() {
        if (petMachine.hasPet()) {
            System.out.println("Já há um pet na máquina.");
            return;
        }

        System.out.print("Digite o nome do pet: ");
        String name = scanner.nextLine().trim();

        if (name.isEmpty()) {
            System.out.println("O nome do pet não pode ficar vazio.");
            return;
        }

        petMachine.setPet(new Pet(name));
    }

    private static void removePetFromMachine() {
        if (!petMachine.hasPet()) {
            System.out.println("Não há pet para remover.");
            return;
        }

        petMachine.removePet();
    }

    private static void washMachine() {
        if (petMachine.hasPet()) {
            System.out.println("Remova o pet antes de limpar a máquina.");
            return;
        }

        if (petMachine.getWater() < 10 || petMachine.getShampoo() < 2) {
            System.out.println("É preciso ter pelo menos 10 unidades de água e 2 de shampoo.");
            return;
        }

        petMachine.wash();
    }
}
