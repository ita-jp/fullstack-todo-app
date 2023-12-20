import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Badge } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';

import { getUser } from './user-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserManagementDetail = () => {
  const dispatch = useAppDispatch();

  const { login } = useParams<'login'>();

  useEffect(() => {
    dispatch(getUser(login));
  }, []);

  const user = useAppSelector(state => state.userManagement.user);

  return (
    <div>
      <h2>
        ユーザー [<strong>{user.login}</strong>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>ログイン</dt>
          <dd>
            <span>{user.login}</span>&nbsp;
            {user.activated ? <Badge color="success">有効</Badge> : <Badge color="danger">無効</Badge>}
          </dd>
          <dt>名</dt>
          <dd>{user.firstName}</dd>
          <dt>姓</dt>
          <dd>{user.lastName}</dd>
          <dt>メールアドレス</dt>
          <dd>{user.email}</dd>
          <dt>作成者</dt>
          <dd>{user.createdBy}</dd>
          <dt>作成日</dt>
          <dd>{user.createdDate ? <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}</dd>
          <dt>更新者</dt>
          <dd>{user.lastModifiedBy}</dd>
          <dt>更新日</dt>
          <dd>
            {user.lastModifiedDate ? (
              <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
            ) : null}
          </dd>
          <dt>プロファイル</dt>
          <dd>
            <ul className="list-unstyled">
              {user.authorities
                ? user.authorities.map((authority, i) => (
                    <li key={`user-auth-${i}`}>
                      <Badge color="info">{authority}</Badge>
                    </li>
                  ))
                : null}
            </ul>
          </dd>
        </dl>
      </Row>
      <Button tag={Link} to="/admin/user-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">戻る</span>
      </Button>
    </div>
  );
};

export default UserManagementDetail;
