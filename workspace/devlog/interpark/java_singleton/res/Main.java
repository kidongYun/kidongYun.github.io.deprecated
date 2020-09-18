public class Main() {
    public static void main(String[] args) {

    }
}

class Singleton {
    /**
     * The reason why this object have been used 'static' keyword is this instance would be built only one time.
     * It doesn't need 'new' keyword for creating this because this is singleton pattern type object.
     * To use the Heap memory on JVM is also good choice if the object is created only one time.
     * */
    private static final Singleton instance = new Singleton();

    /**
     * To use the 'private' keyword is safer than not to do this. Acutally The constructor doesn't need on the outside of this object.
     * Because It would be created at here only one time. So for that, It's better pattern to keep the usage ranges of your objects.
     */
    private Singleton() throws Exception {
        /**
         * To announce 'private' thing on your object isn't enough. Having someone used this object through reflection technique,
         * This 'private' keyword could be passed by the function like 'setAccessible(true);'
         * so We should throw the exception when your object had already been created.
         */
    }
}