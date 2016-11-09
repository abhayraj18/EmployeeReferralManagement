package com.employeereferral.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.employeereferral.model.Candidate;

@Transactional
public class CandidateDAO {
	
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
	
	public boolean doesCandidateExist(String email) {
		String query = "From Candidate where email = ?";
		Query<?> q = getSession().createQuery(query);
		q.setParameter(0, email);
		if(q.getResultList().size() > 0)
			return true;
		return false;
	}
	
	public Candidate addCandidate(Candidate candidate) {
		getSession().save(candidate);
		return candidate;
	}
	
	public void updateCandidate(Candidate candidate) {
		getSession().update(candidate);
	}
	
	public static void main(String[] args) {
		/*@SuppressWarnings("resource")
		AbstractApplicationContext context = new ClassPathXmlApplicationContext("Beans.xml");
		UserDAO dao = context.getBean(UserDAO.class);
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