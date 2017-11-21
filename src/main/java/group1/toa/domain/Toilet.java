package group1.toa.domain;

public class Toilet {
    private String index;

    private String address;
    private float latitude;
    private float longitude;
    private int isHandicap;
    private int hasChangingTable;
    private int mustPay;

    public Toilet(String index, String address, float latitude, float longitude, int isHandicap, int hasChangingTable, int mustPay, String hours) {
        this.index = index;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.isHandicap = isHandicap;
        this.hasChangingTable = hasChangingTable;
        this.mustPay = mustPay;
        this.hours = hours;
    }

    public String getIndex() {
        return index;
    }

    public void setIndex(String index) {
        this.index = index;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public int getIsHandicap() {
        return isHandicap;
    }

    public void setIsHandicap(int isHandicap) {
        this.isHandicap = isHandicap;
    }

    public int getHasChangingTable() {
        return hasChangingTable;
    }

    public void setHasChangingTable(int hasChangingTable) {
        this.hasChangingTable = hasChangingTable;
    }

    public int getMustPay() {
        return mustPay;
    }

    public void setMustPay(int mustPay) {
        this.mustPay = mustPay;
    }

    public String getHours() {
        return hours;
    }

    public void setHours(String hours) {
        this.hours = hours;
    }

    private String hours;
}
