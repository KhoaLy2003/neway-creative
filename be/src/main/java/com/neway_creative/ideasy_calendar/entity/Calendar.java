package com.neway_creative.ideasy_calendar.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Calendar Entity
 *
 * @author khoaly
 */
@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "calendar")
@EntityListeners(AuditingEntityListener.class)
@Builder
public class Calendar extends BaseEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "calendar_id")
    private int calendarId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "price", nullable = false)
    private long price;

    @Column(name = "link_notion", nullable = false)
    private String linkNotion;

    @Column(name = "image", nullable = false)
    private String image;

    @Column(name = "is_delete", nullable = false)
    private boolean isDelete;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToOne(mappedBy = "calendar", cascade = CascadeType.ALL)
    private OrderDetail orderDetail;

    public Calendar() {
        this.isDelete = false;
    }
}
