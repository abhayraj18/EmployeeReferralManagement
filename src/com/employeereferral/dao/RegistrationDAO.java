package com.employeereferral.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.employeereferral.model.Employee;
import com.employeereferral.utils.EncryptionUtils;

@Transactional
public class RegistrationDAO {
	final String secretKey = "A";
	
	@Autowired
	SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	private Session getSession() {
		return getSessionFactory().getCurrentSession();
	}

	public void registerEmployee(Employee employee) {
		String password = employee.getPassword();
		String encryptedPassword = EncryptionUtils.encrypt(password, EncryptionUtils.secretKey);
		employee.setPassword(encryptedPassword);
		getSession().save(employee);
	}

	public boolean doesEmployeeExist(String employeeId) {
		String query = "From Employee where employeeId = :employeeId";
		Query<?> q = getSession().createQuery(query);
		q.setParameter("employeeId", employeeId);
		if(q.getResultList().size() > 0)
			return true;
		return false;
	}
	
}