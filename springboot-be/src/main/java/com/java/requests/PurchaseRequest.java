package com.java.requests;

public class PurchaseRequest {

    private Long id;
    private Boolean isBought;

    public PurchaseRequest(Long id, Boolean isBought) {
        this.id = id;
        this.isBought = isBought;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getBought() {
        return isBought;
    }

    public void setBought(Boolean bought) {
        isBought = bought;
    }
}
