package com.billow.model.repository.program;

import com.billow.domain.entity.program.GenderAgeViewer;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.billow.domain.entity.program.QGenderAgeViewer.genderAgeViewer;

@Repository
public class GenderAgeViewerCustomRepositoryImpl implements GenderAgeViewerCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public GenderAgeViewerCustomRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<GenderAgeViewer> findTop5ByGenderAge(Integer age, String gender) {
        return jpaQueryFactory.select(genderAgeViewer)
                .from(genderAgeViewer)
                .where(genderAgeViewer.program.isNotNull())
                .orderBy(eqName(age, gender))
                .limit(5)
                .fetch();
    }

    private OrderSpecifier<?> eqName(Integer age, String gender) {
        if (gender.equals("남")) {
            if (age == 0) {
                return genderAgeViewer.male0.desc();
            } else if (age == 10) {
                return genderAgeViewer.male10.desc();
            } else if (age == 20) {
                return genderAgeViewer.male20.desc();
            } else if (age == 30) {
                return genderAgeViewer.male30.desc();
            } else if (age == 40) {
                return genderAgeViewer.male40.desc();
            } else if (age == 50) {
                return genderAgeViewer.male50.desc();
            } else if (age == 60) {
                return genderAgeViewer.male60.desc();
            }
        } else {
            if (age == 0) {
                return genderAgeViewer.female0.desc();
            } else if (age == 10) {
                return genderAgeViewer.female10.desc();
            } else if (age == 20) {
                return genderAgeViewer.female20.desc();
            } else if (age == 30) {
                return genderAgeViewer.female30.desc();
            } else if (age == 40) {
                return genderAgeViewer.female40.desc();
            } else if (age == 50) {
                return genderAgeViewer.female50.desc();
            } else if (age == 60) {
                return genderAgeViewer.female60.desc();
            }
        }
        return null;
    }
}