package com.neway_creative.ideasy_calendar.entity;

import com.neway_creative.ideasy_calendar.enumeration.DurationUnitEnum;
import com.neway_creative.ideasy_calendar.enumeration.PackageTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

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
@EntityListeners(AuditingEntityListener.class)
public class Package extends BaseEntity {
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

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "packages")
    @JsonIgnore
    private Set<Order> orders = new HashSet<>();
}
