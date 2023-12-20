import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getUser, getRoles, updateUser, createUser, reset } from './user-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserManagementUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { login } = useParams<'login'>();
  const isNew = login === undefined;

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getUser(login));
    }
    dispatch(getRoles());
    return () => {
      dispatch(reset());
    };
  }, [login]);

  const handleClose = () => {
    navigate('/admin/user-management');
  };

  const saveUser = values => {
    if (isNew) {
      dispatch(createUser(values));
    } else {
      dispatch(updateUser(values));
    }
    handleClose();
  };

  const isInvalid = false;
  const user = useAppSelector(state => state.userManagement.user);
  const loading = useAppSelector(state => state.userManagement.loading);
  const updating = useAppSelector(state => state.userManagement.updating);
  const authorities = useAppSelector(state => state.userManagement.authorities);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>ユーザーの作成または編集</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm onSubmit={saveUser} defaultValues={user}>
              {user.id ? <ValidatedField type="text" name="id" required readOnly label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                type="text"
                name="login"
                label="ログイン"
                validate={{
                  required: {
                    value: true,
                    message: 'ユーザー名が必要です。',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: 'ユーザー名が無効です',
                  },
                  minLength: {
                    value: 1,
                    message: 'ユーザー名は1文字以上で入力してください',
                  },
                  maxLength: {
                    value: 50,
                    message: 'ユーザー名は50文字以下で入力してください',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="firstName"
                label="名"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'このフィールドは50文字以下で入力してください。',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="lastName"
                label="姓"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'このフィールドは50文字以下で入力してください。',
                  },
                }}
              />
              <FormText>This field cannot be longer than 50 characters.</FormText>
              <ValidatedField
                name="email"
                label="メールアドレス"
                placeholder="あなたのメールアドレス"
                type="email"
                validate={{
                  required: {
                    value: true,
                    message: 'メールアドレスを入力してください。',
                  },
                  minLength: {
                    value: 5,
                    message: 'メールアドレスは5文字以上で入力してください。',
                  },
                  maxLength: {
                    value: 254,
                    message: 'メールアドレスは50文字以下で入力してください。',
                  },
                  validate: v => isEmail(v) || '正しいメールアドレスを入力してください。',
                }}
              />
              <ValidatedField type="checkbox" name="activated" check value={true} disabled={!user.id} label="有効" />
              <ValidatedField type="select" name="authorities" multiple label="プロファイル">
                {authorities.map(role => (
                  <option value={role} key={role}>
                    {role}
                  </option>
                ))}
              </ValidatedField>
              <Button tag={Link} to="/admin/user-management" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">戻る</span>
              </Button>
              &nbsp;
              <Button color="primary" type="submit" disabled={isInvalid || updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; 保存
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserManagementUpdate;
