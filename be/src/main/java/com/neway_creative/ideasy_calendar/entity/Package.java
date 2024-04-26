package com.neway_creative.ideasy_calendar.entity;

import com.neway_creative.ideasy_calendar.enumeration.DurationUnitEnum;
import com.neway_creative.ideasy_calendar.enumeration.PackageTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Package Entity
 *
 * @author khoaly
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "package")
@Builder
public class Package extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "package_id")
    private int packageId;

    @Column(name = "price", nullable = false)
    private long price;

    @Column(name = "link_notion", nullable = false)
    private String linkNotion;

    @Column(name = "package_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private PackageTypeEnum packageType;

    @Column(name = "duration_value", nullable = false)
    private int durationValue;

    @Column(name = "duration_unit", nullable = false)
    @Enumerated(EnumType.STRING)
    private DurationUnitEnum durationUnit;

    @ManyToOne
    @JoinColumn(name = "calendar_id", nullable = false)
    private Calendar calendar;
}
