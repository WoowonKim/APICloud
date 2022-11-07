package com.billow.model.repository.organization;

import com.billow.domain.entity.organization.ProgramOrganization;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.billow.domain.entity.organization.QProgramOrganization.programOrganization;

@RequiredArgsConstructor
@Repository
public class ProgramOrganizationCustomRepositoryImpl implements ProgramOrganizationCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    private final StringTemplate stringTemplate = Expressions.stringTemplate(
            "DATE_FORMAT({0}, {1})"
            , programOrganization.broadcastingTime
            , ConstantImpl.create("%Y-%m-%d")
    );

    @Override
    public List<ProgramOrganization> findByProgram_IdAndBroadcastingTime(Long programId, LocalDate date) {
        return jpaQueryFactory.selectFrom(programOrganization)
                .where(programOrganization.program.id.eq(programId)
                        .and(stringTemplate.eq(String.valueOf(date))))
                .orderBy(programOrganization.broadcastingTime.asc())
                .fetch();
    }
}