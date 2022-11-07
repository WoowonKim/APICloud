package com.billow.model.repository.program;

import com.billow.domain.entity.program.Cast;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.billow.domain.entity.addition.QRating.rating;
import static com.billow.domain.entity.program.QCast.cast;

@Repository
public class CastCustomRepositoryImpl implements CastCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public CastCustomRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<String> findActorName(Long userId) {
        return jpaQueryFactory.select(cast.actorName)
                .from(cast)
                .where(cast.program.id.in(
                        jpaQueryFactory.select(rating.program.id)
                                .from(rating)
                                .where(rating.user.id.eq(userId))
                ).and(cast.actorName.ne("")))
                .groupBy(cast.actorName)
                .orderBy(cast.actorName.count().desc())
                .limit(1)
                .fetch();
    }

    @Override
    public List<Cast> findByActorName(Long userId, String actorName) {
        return jpaQueryFactory.selectFrom(cast)
                .where(cast.actorName.eq(actorName)
                        .and(cast.program.id.notIn(
                                jpaQueryFactory.select(rating.program.id)
                                        .from(rating)
                                        .where(rating.user.id.eq(userId))
                        ))
                )
                .fetch();
    }
}