class Collision {
    static checkCollide(obj1, obj2) {
        distX = Math.abs(obj1.x - obj2.x);
        distY = Math.abs(obj1.y - obj2.y);

        if(distX < obj1.width /2) {
            if(distY < obj1.width /2) {
                return true;
            }
        }

        return false;
    }
}