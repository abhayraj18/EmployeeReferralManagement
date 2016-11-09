package com.employeereferral.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.employeereferral.pojo.LoginInfo;
import com.employeereferral.utils.EncryptionUtils;

@Transactional
public class LoginDAO {
	
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
	
	public boolean authenticateUser(LoginInfo loginInfo) {
		String encryptedPassword = EncryptionUtils.encrypt(loginInfo.getPassword(), EncryptionUtils.secretKey);
		String query = "From Employee where employeeId = ? and password = ?";
		Query<?> q = getSession().createQuery(query);
		q.setParameter(0, loginInfo.getEmployeeId());
		q.setParameter(1, encryptedPassword);
		if(q.getResultList().isEmpty())
			return false;
		return true;
	}
	
	public static void main(String[] args) {
		/*@SuppressWarnings("resource")
		AbstractApplicationContext context = new ClassPathXmlApplicationContext("Beans.xml");
		LoginDAO dao = context.getBean(LoginDAO.class);
		Session session = dao.getSessionFactory().openSession();
		session.close();*/
		/*Configuration cfg = new Configuration();
		Properties properties = new Properties();
		try {
			InputStream in = LoginDAO.class.getClassLoader().getResourceAsStream("database.properties");
			properties.load(in);
			in.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		cfg.setProperties(properties);
		System.out.println(cfg.buildSessionFactory().openSession().createQuery("From User").getResultList());*/
	}
	
}